
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  glitchMenu(tabs[0].url);
});

function glitchMenu (url) {
  url = new URL(url);

  if (!url.hostname.endsWith('.glitch.me')) {
    document.body.innerHTML = '<div class="msg">not a glitch project!</div>';
    return;
  }

  const projectName = url.hostname.split('.')[0];

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
      </section>
    </div>`;
  });
}
