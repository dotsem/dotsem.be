export async function handleDownload(pdfRef: HTMLElement | undefined) {
    if (!pdfRef) return;

    const [htmlToImage, { jsPDF }] = await Promise.all([
        import("html-to-image"),
        import("jspdf"),
    ]);

    const content = pdfRef.querySelector(".a4-container") as HTMLElement;
    if (!content) return;

    const imgData = await htmlToImage.toPng(content, {
        pixelRatio: 2,
        backgroundColor: "#ffffff",
    });

    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [content.offsetWidth, content.offsetHeight],
    });

    pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        content.offsetWidth,
        content.offsetHeight,
    );
    pdf.save("Sem_Van_Broekhoven_CV.pdf");
}