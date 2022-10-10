import supertest from "supertest";
const request = supertest('https://gorest.co.in/public/');
const TOKEN = 'f163e665de46756702766387b5efd3ddd4c5d96453fbf64c521cb3e6e87e767f'

import {expect} from 'chai';

describe('user posts', () => {

    it('POST', async () => {
        // to use async await method 
        const data = {
            "user_id": 310,
            "title": "My new post",
            "body": "Nwe post"
          }
        const res = await request
        .post('v2/posts')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(data);
        
        console.log(res.body)
        expect(res.body.user_id).to.be.eq(data.user_id)

        
    })

    
})