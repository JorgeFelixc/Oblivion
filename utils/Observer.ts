interface DynamicObject {
  [key: string]: {
    emit: (...args: [any]) => void;
    childrens: number;
  };
}

export default class Observer {
  observers: DynamicObject;

  constructor() {
    this.observers = {};
  }

  makeObservable(channel: string, callback: (...args: any[]) => void) {
    if (this.observers[channel]) {
      console.log("this observer already exists");
      return;
    }

    this.observers[channel] = {
      emit: (...arg) => {
        callback(arg);
      },
      childrens: 0,
    };
    return this.observers[channel];
  }

  getObservable(channel: string) {
    return this.observers[channel] || null;
  }

  unsuscribe(channel: string) {
    if (!this.observers[channel]) {
      return;
    }

    delete this.observers[channel];
  }
}
