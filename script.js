//Paste the generated API Key here
let apiKey = "kR9lHk7wuV9TQYuRP97zirVFySiOfqYj";
let submitBtn = document.getElementById("submit-btn");

let generateGif = () => {
    let loader = document.querySelector(".loader");
    loader.style.display = "block";
    document.querySelector(".wrapper").style.display = "none";
    document.querySelector(".search-container").style.display = "none";
    document.querySelector(".container h1").style.display = "none";

    let q = document.getElementById("search-box").value;
    let gifCount = 8;
    let finalURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=${gifCount}&offset=0&rating=g&lang=en`;
    document.querySelector(".wrapper").innerHTML = "";

    fetch(finalURL)
        .then((resp) => resp.json())
        .then((info) => {
            let gifsData = info.data;
            gifsData.forEach((gif) => {
                let container = document.createElement("div");
                container.classList.add("img-container");

                let iframe = document.createElement("img");
                iframe.setAttribute("src", gif.images.downsized_medium.url);

                iframe.onload = () => {
                    gifCount--;
                    if (gifCount == 0) {
                        loader.style.display = "none";
                        document.querySelector(".wrapper").style.display = "flex";
                        document.querySelector(".search-container").style.display = "";
                        document.querySelector(".container h1").style.display = "";
                    }
                };

                container.append(iframe);

                // Copy Link Button
                let copyBtn = document.createElement("button");
                copyBtn.innerText = "Copy Link";
                copyBtn.onclick = () => {
                    let copyLink = `https://media4.giphy.com/media/${gif.id}/giphy.mp4`;
                    navigator.clipboard
                        .writeText(copyLink)
                        .then(() => {
                            alert("GIF copied to clipboard");
                        })
                        .catch(() => {
                            alert("GIF copied to clipboard");
                            let hiddenInput = document.createElement("input");
                            hiddenInput.setAttribute("type", "text");
                            document.body.appendChild(hiddenInput);
                            hiddenInput.value = copyLink;
                            hiddenInput.select();
                            document.execCommand("copy");
                            document.body.removeChild(hiddenInput);
                        });
                };
                container.append(copyBtn);

                // Download Button
                let downloadBtn = document.createElement("button");
                downloadBtn.innerText = "Download GIF";
                downloadBtn.onclick = () => {
                    const gifUrl = gif.images.original.url;
                    const a = document.createElement("a");
                    a.href = gifUrl;
                    a.download = `gif-${gif.id}.gif`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                };
                container.append(downloadBtn);

                document.querySelector(".wrapper").append(container);
            });
        });
};

// Generate Gifs on screen load or when user clicks on submit
submitBtn.addEventListener("click", generateGif);
