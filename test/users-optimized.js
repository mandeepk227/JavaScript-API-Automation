import supertest from "supertest";
const request = supertest('https://gorest.co.in/public/');
const TOKEN = 'f163e665de46756702766387b5efd3ddd4c5d96453fbf64c521cb3e6e87e767f'

import {expect} from 'chai';

describe('Users',  () => {
    let userID;

    describe('POST', () => {

        it('/users', () => {
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
                        userID = res.body.id
                   })
       })
    })

    describe('GET', () => {

        it('/Users/:id', () => {
            return request.get(`v2/users/${userID}?access-token=${TOKEN}`).then((res) => {
                    expect(res.body.id).to.be.eq(userID);
            })
        });
    
        it('/Users with query params', () => {
            const url = `v2/users?access-token=${TOKEN}&page=5&gender=male&status=active`
            return request.get(url).then((res) => {
                    expect(res.body).to.not.be.empty;
                    res.body.forEach(body => {
                        expect(body.gender).to.eq('male')
                        expect(body.status).to.eq('active')                    
                    });            
           })
       });
    })

    describe('PUT', () => {

        it('/users/id', () => {
            const data = {
                "name" : `Luffy-${Math.floor(Math.random()*999)}`
            }
            return request
                    .put(`v2/users/${userID}`)
                    .set("Authorization", `Bearer ${TOKEN}`)
                    .send(data)
                    .then((res) => {
                        console.log(res.body);
                        expect(res.body.name).to.eq(data.name)
                    })
       })
    })

    describe('DELETE', () => {

        it('/users/id', () => {
            return request
                    .delete(`v2/users/${userID}`)
                    .set("Authorization", `Bearer ${TOKEN}`)
                    .then((res) => {
                        expect(res.body).to.eq(null)
                    })
       })
    })   
});
