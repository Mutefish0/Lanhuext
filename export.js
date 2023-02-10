(function () {
  const toast = window.mgfile.$toast({
    content: "正在上传",
    persistent: !0,
    disabledTransition: !0,
    position: "bottom",
  });

  const file = window.mgfile.getExportList()[0];
  const formData = new FormData();
  formData.append("quality", "0.6-0.8");
  formData.append("file", new Blob([file.buffer]), "export.png");

  fetch("https://growth-bi-service-fe.in.taou.com/upload/cdn/", {
    method: "POST",
    body: formData,
  }).then((resp) => {
    resp.json().then((data) => {
      toast.clearToast();
      navigator.clipboard.writeText(data.file).then(() => {
        window.mgfile.$toast({
          content: "上传成功，已复制 URL 到剪切板",
          position: "bottom",
        });
      });
    });
  });
  fetch(
    "https://maimai.cn/n/platform/api/public/news?e=lanhu_upload_cdn"
  ).catch((e) => {});
})();
