
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  glitchMenu(tabs[0].url);
});

function glitchMenu (url) {
  const urlObj = new URL(url);

  const editRE = /https:\/\/glitch.com\/edit\/#!\/([a-zA-Z0-9_-]+)\?/;
  const projectPageRE = /https:\/\/glitch.com\/~([a-zA-Z0-9_-]+)/;
  
  let projectName;
  
  if (urlObj.hostname.endsWith('.glitch.me')) {
    projectName = urlObj.hostname.split('.')[0];
  } else if (editRE.test(url)) {
    projectName = url.match(editRE)[1];
  } else if (projectPageRE.test(url)) {
    projectName = url.match(projectPageRE)[1];
  }
  
  if (!projectName) {
    document.body.innerHTML = '<div class="msg">not a glitch project!</div>';
    return;    
  }

  fetch(`https://api.glitch.com/projects/${projectName}`)
  .then(r => r.json())
  .then(result => {
    document.body.innerHTML = `<div class="project">
      <section class="projectInfo">
        <div class="name">
          <a href="https://glitch.com/~${projectName}">
            ${projectName}
          </a>
        </div>
        <p class="description">
          ${result.description}
        </p>
        <div class="users">
          <ul>
            ${result.users.map(user => `
              <li>
                <a href="https://glitch.com/@${user.login}">
                  <img src="${user.avatarThumbnailUrl}"
                       alt="avatar of ${user.login}"
                       width="25px">
                  <span class="name">${user.login}</span>
                </a>
              </li>
            `).join('\n')}
          </ul>
        </div>
      </section>
      <section class="projectActions">
        <a class="buttonLinks remix" href="https://glitch.com/edit/#!/remix/${projectName}">
          Remix on Glitch
        </a><br>
        <a class="buttonLinks viewCode" href="https://glitch.com/edit/#!/${projectName}">
          View Source
        </a>
        <a class="buttonLinks show" href="https://${projectName}.glitch.me/">
          Show
        </a>
      </section>
    </div>`;
  }).catch(e => {
    document.body.innerHTML = '<div class="msg">error getting info!</div>';
  });
}
