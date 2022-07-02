// Observer/Subscriber: 观察者
// Publisher/Publisher: 发布者

type EventHandler = (...args : any[]) => void

export class Emiter<EventType extends string | number> {

  private topics = new Map<EventType, EventHandler[]>()

  private getTopic(type: EventType) : EventHandler[] {
    if(!this.topics.has(type)){
      this.topics.set(type, [])
    }
    return this.topics.get(type)
  }

  private remodeHandler(type: EventType, handler: EventHandler) {

    if(!this.topics.has(type)){
      return
    }
    const handlers = this.topics.get(type).filter(x => x !== handler )
    this.topics.set(type, handlers)
  }

  on(type : EventType, handler : EventHandler) { // 可以被观察，别人来监听
    const handlers = this.getTopic(type)
    handlers.push(handler)
    return () => { // 删除方法
      this.remodeHandler(type, handler)
    }
  }
  emit(type : EventType, ...args: any[]) { // 向监听的人发布消息
    const handlers = this.getTopic(type)
    handlers.forEach(handler => {
      handler(...args)
    })
  }

}