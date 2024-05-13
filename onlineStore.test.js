let { assert } = require('chai');
let onlineStore = require('./onlineStore');
const { it } = require('mocha');

describe('Test', ()=>{
    describe('isProductAvailable', ()=>{
        it('error 1', ()=>{
            assert.throw(()=> onlineStore.isProductAvailable(2, 'ss'), 'Invalid input.')
            assert.throw(()=> onlineStore.isProductAvailable({}, []), 'Invalid input.')
            assert.throw(()=> onlineStore.isProductAvailable(true, {}), 'Invalid input.')
        })
        it('passed 1', ()=>{
            assert.equal(onlineStore.isProductAvailable('sss', 0), 'Sorry, sss is currently out of stock.')
            assert.equal(onlineStore.isProductAvailable('sss', -2), 'Sorry, sss is currently out of stock.')
        })
        it('passed 2', ()=>{
            assert.equal(onlineStore.isProductAvailable('sss', 2), 'Great! sss is available for purchase.')
        })
    })

    describe('canAffordProduct', ()=>{
        it('error 1', ()=>{
            assert.throw(()=> onlineStore.canAffordProduct('sss', []), "Invalid input.")
            assert.throw(()=> onlineStore.canAffordProduct(false, {}), "Invalid input.")
            assert.throw(()=> onlineStore.canAffordProduct(NaN, '[]'), "Invalid input.")
        })
        it('passed 1', ()=>{
            assert.equal(onlineStore.canAffordProduct(23, -22), "You don't have sufficient funds to buy this product.")
            assert.equal(onlineStore.canAffordProduct(22, -22), "You don't have sufficient funds to buy this product.")
            assert.equal(onlineStore.canAffordProduct(23, 22), "You don't have sufficient funds to buy this product.")
        })
        it('passed 2', ()=>{
            assert.equal(onlineStore.canAffordProduct(22, 22), "Product purchased. Your remaining balance is $0.")
            assert.equal(onlineStore.canAffordProduct(22, 52), "Product purchased. Your remaining balance is $30.")
            assert.equal(onlineStore.canAffordProduct(22, 122), "Product purchased. Your remaining balance is $100.")
        })
    })

    describe('getRecommendedProducts', ()=>{
        it('error 1', ()=>{
            assert.throw(()=> onlineStore.getRecommendedProducts('sss', []), 'Invalid input.')
            assert.throw(()=> onlineStore.getRecommendedProducts(false, 'sss'), 'Invalid input.')
            assert.throw(()=> onlineStore.getRecommendedProducts(333, {}), 'Invalid input.')
        })
        it('passed 1', ()=>{
            assert.equal(onlineStore.getRecommendedProducts([{ name: "Camera", category: "Photography" }], 'Photography'), 'Recommended products in the Photography category: Camera')
            assert.equal(onlineStore.getRecommendedProducts([{ name: "Camera", category: "Photography" }], 'sssss'), 'Sorry, we currently have no recommended products in the sssss category.')
        })
    })
})