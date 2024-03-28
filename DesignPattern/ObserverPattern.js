// 响应式对象集合
const targetMap = new WeakMap()

// 跟踪
function track(target, key){
    // 集合里的元素是响应式对象的属性集合
    let depsMap = targetMap.get(target)
    if(!depsMap){
        targetMap.set(target, (depsMap = new Map()))
    }
    // 响应式对象的属性集合里的元素是其改变时要执行的副作用函数
    let dep = depsMap.get(key)
    if(!dep){
        depsMap.set(key, (dep = new Set()))
    }
    dep.add(effect)
}

// 触发
function trigger(target, key){
    const depsMap = targetMap.get(target)
    if(!depsMap){ return }
    
    const dep = depsMap.get(key)
    if(dep){
        dep.forEach(effect => effect())
    }
}

function reactive(obj){
    const pobj = new Proxy(obj, {
        get: function(target, key, receiver) {
            const result = Reflect.get(target, key, receiver)
            track(obj, key)
            return result
        },
        set: function(target, key, value, receiver) {
            const oldValue = target[key]
            const result = Reflect.set(target, key, value, receiver)
            if(oldValue !== result){
                trigger(target, key)
            }
            return result
        }
    })
    return pobj
}

// 创建响应式对象
const person = reactive({
    name: "张三",
    greeting: "hello world!"
})

function print() {
    console.log(`${person.name}说：“${person.greeting}”`)
}

// 副作用函数
const effect = () => { print() }
effect()


setTimeout(() => {
    person.name = '李四'
}, 2000)