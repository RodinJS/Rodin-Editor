function EditorConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.editor', {
      url: '/:username/:projectFolder?token&id&socialEmail',
      controller: 'EditorCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'pages/editor/editor.html',
      title: 'Editor',
      pageClass: "page-work-space",
      resolve: {
        auth: function (User) {
          return User.ensureAuthIs(true);
        }
      }
    });

}

export default EditorConfig;
