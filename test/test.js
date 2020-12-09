const bind2 = require('../src/index')
Function.prototype.bind2 = bind2

test1('最基本的bind功能')
test2('支持初this外的其他参数')
test3('支持分步骤，多次调用参数')
test4('支持new')
test5('支持原型上的绑定')
function test1() {
    const fn1 = function () {
        return this
    }
    const fn2 = fn1.bind2({ name: 'freddy' })
    console.assert(fn2().name === 'freddy')
}
function test2() {
    const fn1 = function (p1, p2) {
        return [this, p1, p2]
    }
    const fn2 = fn1.bind2({ name: 'freddy' }, 'x', 'y')
    console.assert(fn2()[0].name === 'freddy')
    console.assert(fn2()[1] === 'x')
    console.assert(fn2()[2] === 'y')
}
function test3() {
    const fn1 = function (p1, p2) {
        return [this, p1, p2]
    }
    const fn2 = fn1.bind2({ name: 'freddy' }, 'x')
    console.assert(fn2('y')[0].name === 'freddy', 'this')
    console.assert(fn2('y')[1] === 'x', 'p1')
    console.assert(fn2('y')[2] === 'y', 'p2')
}
function test4() {
    const fn1 = function (p1, p2) {
        this.a = p1
        this.b = p2
    }
    const fn2 = fn1.bind2(undefined, 'x', 'y')
    const object = new fn2()
    console.assert(object.a === 'x', 'p11')
    console.assert(object.b === 'y', 'p22')
}

function test5() {
    const fn1 = function (p1, p2) {
        this.a = p1
        this.b = p2
    }
    fn1.prototype.sayHi = function () { }
    const fn2 = fn1.bind2(undefined, 'x', 'y')
    const object = new fn2()
    console.assert(object.a === 'x')
    console.assert(object.b === 'y')
    console.assert(typeof object.__proto__.sayHi === 'function')
}
