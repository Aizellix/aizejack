import controller from './controller';

export function setup(router) {
  router.post('/start', controller.startGame);
  router.post('/call', controller.callCard);
  router.post('/hit', controller.hitCard);
  router.post('/stand', controller.standCard);
  router.post('/score', controller.scoreTable);
}
