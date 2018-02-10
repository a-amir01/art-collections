/**
 * Created by amirassad on 11/10/17.
 */

require('babel-polyfill');

process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');

const server = require('../apiServer');
const Category = require('../models/categories');
const Painting = require('../models/painting');

const should = chai.should();
chai.use(chaiHTTP);

let db = undefined;

function postPainting(db, painting) {
    //const { title, image, size, style, category, description } = painting;
    db
        .post('/api/gallery')
        .send(painting)
        .end((err, res) => {
            // console.log("---------------");
            // console.log(res.body);
            res.should.have.status(200);
            res.body.should.have.property('title');
            res.body.should.have.property('image');
            res.body.should.have.property('size');
            res.body.should.have.property('style');
            res.body.should.have.property('category');
            res.body.should.have.property('description');
        });
}

describe('Gallery', function() {
    beforeEach(function(done) {
        db = chai.request(server);
        // Category.remove({}, (err) => {
        //     done();
        // });

        Painting.remove({}, (err) => {
            done();
        });
    });

    after(function(done) {
        Painting.remove({}, (err) => {
            done();
        });
    });

    describe('/GET gallery', function() {
        it('should give zero paintings', function(done) {
            db
                .get('/api/gallery')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });

        it('should give back all paintings', function(done) {
            const painting = {
                title: "one!!!",
                image: "path/one",
                size: "1",
                style: "abstract",
                category: 'painting',
                description: 'first description'
            };

            const painting2 = {
                title: "two",
                image: "path/two",
                size: "2",
                style: "abstract",
                category: 'color',
                description: 'second description'
            };

            const painting3 = {
                title: "three",
                image: "path/three",
                size: "3",
                style: "abstract",
                category: 'color',
                description: 'third description'
            };

            Promise.all([postPainting(db, painting), postPainting(db, painting2), postPainting(db, painting3)]).then(function(data) {
                db.get('/api/gallery')
                    .end((err, res) => {
                    // console.log("\n\n\n\n\n\n\n");
                    // console.log(res.body);
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.length.should.be.eql(3);
                        done();
                    });
            });

        });
    });

    describe('/GET/:id painting', function() {
        it('should get a painting by its ID', function(done) {
            const painting = new Painting({
                title: "getID",
                image: "path/ID",
                size: "ID",
                style: "abstract",
                category: 'color',
                description: 'ID description'
            });

            painting.save((err, painting) => {
                chai.request(server)
                    .get('/api/gallery/' + painting.id)
                    .send(painting)
                    .end((err, res) => {
                        const body = res.body;
                        res.should.have.status(200);
                        body.should.have.property('title');
                        body.should.have.property('image');
                        body.should.have.property('size');
                        body.should.have.property('style');
                        body.should.have.property('category');
                        body.should.have.property('description');
                        res.body.should.have.property('_id').eql(painting.id);
                        done();
                    });
            });
        });
    });
});