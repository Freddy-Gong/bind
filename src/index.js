
//新语法版本
function bind(isThis, ...args) {
    //this就是要调用的那个函数
    const fn = this
    function resultFn(...args2) {
        return fn.call(this.__proto__ === resultFn.prototype ? this : isThis, ...args, ...args2)
    }
    resultFn.prototype = fn.prototype
    return resultFn
}

//老语法版本
var slice = Array.prototype.slice
function oldBind() {
    var fn = this
    var fnThis = arguments[0]
    var otherArgs = slice.call(arguments, 1) //特殊用法，因为arguments不能直接slice
    if (typeof fn !== 'function') {
        throw new Error('bind必须要绑定在一个函数上')
    }
    function resultFn() {
        var allArgs = otherArgs.concat(slice.call(arguments, 0))//要先把这个argument，slice一下
        return fn.apply(this.__proto__ === resultFn.prototype ? this : fnThis, allArgs)
    }
    resultFn.prototype = fn.prototype
    return resultFn
}

module.exports = oldBind

if (!Function.prototype.bind) {
    Function.prototype.bind = bind
}