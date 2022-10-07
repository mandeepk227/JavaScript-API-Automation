import supertest from "supertest";
const request = supertest('https://gorest.co.in/public/');
const TOKEN = 'f163e665de46756702766387b5efd3ddd4c5d96453fbf64c521cb3e6e87e767f'

import {expect} from 'chai';

describe('Users',  () => {

    it('GET /Users', () => {
        //  request.get(`v2/users?access-token=${TOKEN}`).end((err,res) => {
        //    expect(res).to.not.be.empty;
            // console.log(err)
            // console.log(res.body)
            // done(); //done callback to handle the async behaviour
        return request.get(`v2/users?access-token=${TOKEN}`).then((res) => {
                expect(res).to.not.be.empty;
        })
    });

    it('GET /Users with query params', () => {
        const url = `v2/users?access-token=${TOKEN}&page=5&gender=male&status=active`
        return request.get(url).then((res) => {
                expect(res.body).to.not.be.empty;
                res.body.forEach(body => {
                    expect(body.gender).to.eq('male')
                    expect(body.status).to.eq('active')                    
                });            
       })
   });

   it('POST /users', () => {
        const data =  {
            
            "name": "Sheela Iyer",
            "email": `iyer_shee${Math.floor(Math.random()*999)}@brown23.com`,
            "gender": "male",
            "status": "inactive"
          }
        return request
               .post('v2/users')
               .set("Authorization", `Bearer ${TOKEN}`)
               .send(data)
               .then((res) => {
                    console.log(res.body);
                    expect(res.body.email).to.eq(data.email)
                    expect(res.body).to.deep.include(data) // to verify all the data at once
               })
   })

   it.only('PUT /user/id', () => {
        const id = 153
        const data = {
            "name" : `Luffy-${Math.floor(Math.random()*999)}`
        }
        return request
                .put(`v2/users/${id}`)
                .set("Authorization", `Bearer ${TOKEN}`)
                .send(data)
                .then((res) => {
                    console.log(res.body);
                    expect(res.body.name).to.eq(data.name)
                })
   })
});
