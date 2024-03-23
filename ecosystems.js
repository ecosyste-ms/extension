var api_token

function isActionablePage() {
  // is the url a repository or package page?
  var url = window.location.href
  // load list of hosts and registries   
}

async function activate() {
  if(isActionablePage()){
    lookup()
  }
}

function lookup() {
  fetch('https://ecosyste.ms/api/notifications/lookup?url='+window.location, {
    headers:{
      'Authorization': `Bearer ${api_token}`
    }})
   .then(resp => resp.json())
   .then(async json => {
     render(json)
   })
   .catch( error => console.error(error))
}

async function render(project) {
  var ecosystemsRoot = document.getElementById('ecosystems-root');

  if(ecosystemsRoot){
    // empty it
    while (ecosystemsRoot.firstChild) ecosystemsRoot.removeChild(ecosystemsRoot.firstChild);
  } else {
    // create it
    document.body.style.margin = "0 0 30px 0";
    var ecosystemsRoot = document.createElement("div");
    ecosystemsRoot.setAttribute("id", "ecosystems-root");
    document.body.appendChild(ecosystemsRoot);
    ecosystemsRoot.classList.add("ecosystems")
  }

  const htmlRoot = document.documentElement
  var theme = htmlRoot.getAttribute('data-color-mode')
  ecosystemsRoot.classList.add(theme)

  var logo = document.createElement("a")
  logo.classList.add("mr-6")
  logo.setAttribute("id", "ecosystems-logo");
  logo.setAttribute("href", "https://ecosyste.ms");
  var image = document.createElement("img")
  image.src = chrome.runtime.getURL("icons/infinitacle.svg");
  logo.appendChild(image)
  ecosystemsRoot.appendChild(logo)

}

// load on first page load
activate()

// load again after a pjax load
document.addEventListener('pjax:end', () => {
  activate()
});

document.addEventListener('pjax:popstate', () => {
  activate()
});

