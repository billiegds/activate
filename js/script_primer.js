

function initPage() {
  showDashboard() 
}

function showDashboard() {
  document.getElementById("dashboardContent").classList.add("visible");
}

// Call initPage() when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
  initPage();
});

window.watsonAssistantChatOptions = {
  integrationID: "c6cd805b-092d-4ae9-9962-2a0e3f852d18", // The ID of this integration.
  region: "us-south", // The region your integration is hosted in.
  serviceInstanceID: "a698c434-eb00-4f89-a50c-fb2fb4181554", // The ID of your service instance.
  onLoad: async (instance) => { await instance.render(); },
  showRestartButton: true,
};
setTimeout(function(){
  const t=document.createElement('script');
  t.src="https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
  document.head.appendChild(t);
});