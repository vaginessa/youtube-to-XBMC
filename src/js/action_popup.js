;(function()
{
    var sendMessage = chrome.extension.sendMessage || chrome.runtime.sendMessage || function(){};

    class ActionPopup
    {
        constructor()
        {
            console.log("action popup");

            this.onPlayNowClick = this.onPlayNowClick.bind(this);
            this.onQueueClick = this.onQueueClick.bind(this);
            this.onSettingsClick = this.onSettingsClick.bind(this);

            this.playNowButton = document.getElementById("playnow_button_js");
            this.playNowButton.disabled = false;
            this.playNowButton.addEventListener("click", this.onPlayNowClick);

            this.queueButton = document.getElementById("queue_button_js");
            this.queueButton.disabled = false;
            this.queueButton.addEventListener("click", this.onQueueClick);

            this.settingsButton = document.getElementById("settings_button_js");
            this.settingsButton.addEventListener("click", this.onSettingsClick);

            sendMessage({message: "popupOpened"}, response => {
                console.log("popupOpened ", response);
                const disabled = !response.success;
                this.playNowButton.disabled = disabled;
                this.queueButton.disabled = disabled;
            });
        }

        onPlayNowClick()
        {
            console.log("play click " + this.playNowButton);
            sendMessage({message: "playNowFromPopup"}, response => {
                console.log("playNowFromPopup ", response);
            });
        }

        onQueueClick()
        {
            sendMessage({message: "queueFromPopup"}, response => {
                console.log("queueFromPopup ", response);

            });
        }

        onSettingsClick()
        {
            sendMessage({message: "openSettings"}, response => {

            });
        }

    }

    new ActionPopup()
})();