export class EventFactory {
  static NewCustomEvent(eventName: string, defInit?: EventInit) {
    return class E extends Event {
      static EventName = eventName;

      constructor(init: EventInit | undefined = defInit) {
        super(E.EventName, init);
      }
    };
  }
}
