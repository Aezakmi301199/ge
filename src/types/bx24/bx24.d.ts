declare namespace BX24 {
  function init(callback?: () => void): void;
  function install(callback: () => void): void;
  function installFinish(): void;
  function callMethod(method: string, params: any, callback?: (result: any) => void): void;
  function callBatch(
    calls: Array<any> | NonNullable<unknown>,
    callback?: (result: any) => void,
    bHaltOnError?: boolean,
  ): void;
  function callBind(event: string, handler: string, auth_type?: number, callback?: (result: any) => void): boolean;
  function callUnBind(event: string, handler: string, auth_type?: number, callback?: (result: any) => void): boolean;
  function callUnbind(event: string, handler: string, auth_type?: number, callback?: (result: any) => void): boolean;
  function canUse(method: string): boolean;
  function isAdmin(): boolean;
  function getAuth():
    | {
        access_token: string;
        refresh_token: string;
        expires_in: number;
        domain: string;
        member_id: string;
      }
    | false;
  function getLang(): string;
  function getDomain(): string;
  function refreshAuth(cb?: (auth: any) => void): void;
  function resizeWindow(width: number, height: number, cb?: () => void): void;
  function fitWindow(cb?: () => void): void;
  function reloadWindow(cb?: () => void): void;
  function setTitle(title: string, cb?: () => void): void;
  function scrollParentWindow(scroll: number, cb?: () => void): void;
  function isReady(): boolean;
  function ready(handler: () => void): void;
  function proxy(func: Function, thisObject: any): Function;
  function proxyContext(): any;
  function bind(el: Element, evname: string, func: EventListener): void;
  function unbind(el: Element, evname: string, func: EventListener): void;
  function getScrollSize(): { scrollWidth: number; scrollHeight: number };
  function selectAccess(title: string | any, value?: any, cb?: (result: any) => void): void;
  function selectUser(title?: string, cb?: (result: any) => void): void;
  function selectUsers(title?: string, cb?: (result: any) => void): void;
  function selectCRM(params: any, cb?: (result: any) => void): void;
  function openApplication(params: any, cb?: (result: any) => void, settings?: any): void;
  function openPath(path: string, cb?: () => void): void;
  function closeApplication(cb?: () => void): void;

  namespace im {
    function callTo(userId: string | number, video: boolean): void;
    function phoneTo(phone: string): void;
    function openMessenger(dialogId: string): void;
    function openHistory(dialogId: string): void;
  }

  namespace placement {
    function info(): { placement: string; options: any };
    function getInterface(cb: (result: any) => void): void;
    function call(cmd: string, params: any, cb?: (result: any) => void): void;
    function bindEvent(eventName: string, cb: (result: any) => void): void;
  }

  function loadScript(script: string | string[], callback?: () => void): void;

  const userOption: {
    get(name: string): any;
    set(name: string, value: any): void;
  };

  const appOption: {
    get(name: string): any;
    set(name: string, value: any, cb?: () => void): void;
  };
}
