import supertest from "supertest";
const request = supertest('https://gorest.co.in/public/');
const TOKEN = 'f163e665de46756702766387b5efd3ddd4c5d96453fbf64c521cb3e6e87e767f'

import {expect} from 'chai';

describe('Users',  () => {

    it('GET /Users', (done) => {
         request.get(`v2/users?access-token=${TOKEN}`).end((err,res) => {
           expect(res).to.not.be.empty;
            console.log(err)
            console.log(res.body)
            done();
        })
    });
});
