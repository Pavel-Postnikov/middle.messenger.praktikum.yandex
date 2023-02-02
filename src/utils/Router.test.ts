import { expect } from 'chai';
import sinon from 'sinon';
import Router, { BlockConstructable } from './Router'


describe('Router', () => {

// @ts-ignore
  global.window.history.back = () => {
      if (typeof window.onpopstate === 'function') {
        window.onpopstate({currentTarget: window} as unknown as PopStateEvent);
      }
  };

  global.window.history.forward = () => {
      if (typeof window.onpopstate === 'function') {
        window.onpopstate({currentTarget: window} as unknown as PopStateEvent);
      }
  };
  

  const getContentFake = sinon.fake.returns(document.createElement('div'));
    
  const BlockMock = class {
    getContent = getContentFake;
  } as unknown as BlockConstructable

  describe('use()', () => {
    it('should return Router instanse', () => {
     const result = Router.use('/', BlockMock);

     expect(result).to.eq(Router);
    })
  })

  describe('back', () => {
    it('should render a page on history backward', () => {
      window.location.pathname = '/profile'

      Router
        .use('/', BlockMock)
        .start();

        window.location.pathname = '/'

      Router.back();
      expect(getContentFake.callCount).to.eq(1);
    })
  })

  describe('forward', () => {
    it('should render a page on history forward', () => {
      window.location.pathname = '/profile'

      Router
        .use('/', BlockMock)
        .start();

        window.location.pathname = '/'

      Router.forward();
      expect(getContentFake.callCount).to.eq(1);
    })
  })

  describe('start', () => {
    it('should render a page on start', () => {

      Router
        .use('/', BlockMock)
        .start();

        window.location.pathname = '/'

      expect(getContentFake.callCount).to.eq(1);
    })
  })

})
