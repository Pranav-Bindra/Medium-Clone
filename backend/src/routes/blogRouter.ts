import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from '@pbindra/medium-common'

export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string
        JWT_SECRET: string
	},
    Variables : {
        userId: string;
    }
}>();

blogRouter.use('/*', async (c,next) => {
    const auth =  c.req.header("authorization") || "";

    try{
        const user = await verify(auth, c.env.JWT_SECRET);
    if (user) {
        c.set("userId", user.id)
        await next();
    } else{
        c.status(403);
        return c.json({
            message: "You are not signed in"
        })
    }

    }catch(e){
        c.status(403);
        return c.json({
            message: "You are not signed in"
        })
    }
    
});

blogRouter.post('/', async (c) => {
    const userId = c.get("userId")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

    const response = await c.req.json();

    const { success } = createBlogInput.safeParse(response);
    
    if (!success){
        c.status(411);
      return c.json({
        message: "Inputs are not correct"
      })
    }
    
    const post = await prisma.post.create({
        data: {
            title: response.title,
            content: response.content,
            authorId: userId
        }
        
    })
    
    return c.json({
        id: post.id
    })
  })
  
blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

    const response = await c.req.json();

    const { success } = updateBlogInput.safeParse(response);
    
    if (!success){
        c.status(411);
      return c.json({
        message: "Inputs are not correct"
      })
    }
    
    const post = await prisma.post.update({
        where: {
            id: response.id
        },
        data : {
            title: response.title,
            content: response.content
        }
    })
    
    return c.json({
        id: post.id
    })
  })

  blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

    const posts = await prisma.post.findMany({
        select : {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    });

    return c.json({
        posts: posts
    })
  })
  
blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

      const id = c.req.param("id");
    
    try{
    const post = await prisma.post.findUnique({
        where: {
            id: id
        },
        select :{
            id: true,
            title: true,
            content: true,
            author : {
                select: {
                    name: true
                }
            }
        }
    })
    
    return c.json({
        post
    })
    } catch(e){
        c.status(411);
        return c.json({
            message: "Error while fetching blog post"
        })
    }

    
})
  

  