import supertest from "supertest";
const request = supertest('https://gorest.co.in/public/');
const TOKEN = 'f163e665de46756702766387b5efd3ddd4c5d96453fbf64c521cb3e6e87e767f'

import {expect} from 'chai';

describe('user posts', async () => {
    let postID;
    const data = {
        "user_id": Math.floor(Math.random()*999),
        "title": "My new post",
        "body": "Nwe post"
      }

    it('POST', async () => {
        // to use async await method 
        
        const res = await request
        .post('v2/posts')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(data);
        
        console.log(res.body)
        // await expect(res.body.user_id).to.be.eq(data.user_id)
        postID = res.body.id
        
    })

    it('GET /:id', async () => {
        const res = await request
        .get(`v2/posts/${postID}`)
        .set('Authorization', `Bearer ${TOKEN}`)
        .expect(200)
        await expect(res.body).to.deep.include(data)
        console.log(res.statusCode)
            
    })
})