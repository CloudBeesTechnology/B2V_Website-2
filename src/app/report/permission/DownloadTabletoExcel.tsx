import ExcelJS from "exceljs";

const DownloadTableToExcel = async (reportTitle: string) => {
  try {
    if (!reportTitle) return;

    const rows = document.querySelectorAll("table tbody tr");
    const tableData = Array.from(rows).map((row) => {
      const cells = row.querySelectorAll("td");
      return Array.from(cells).map((cell) => cell.innerText);
    });

    const thead = document.querySelector("table thead tr");
    if (!thead) {
      console.error("Table header not found");
      return;
    }

    const headers = Array.from(thead.querySelectorAll("th, td")).map(
      (cell) => (cell as HTMLElement).innerText
    );

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(reportTitle);

    // Set columns with header and dynamic width
    worksheet.columns = headers.map((header, index) => ({
      header,
      key: `col${index}`,
      width: Math.max(header.length + 5, 15),
    }));

    // Add rows
    tableData.forEach((row) => {
      worksheet.addRow(row);
    });

    // Style header row
    const headerRow = worksheet.getRow(1);
    headerRow.height = 24;
    headerRow.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
      cell.alignment = { horizontal: "center", vertical: "middle" };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF4B5563" }, // Dark Gray
      };
      cell.border = {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // Style data rows
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber !== 1) {
        row.height = 20;
        row.eachCell((cell) => {
          cell.font = { color: { argb: "FF000000" } };
          cell.alignment = { horizontal: "left", vertical: "middle" };
          cell.border = {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
          };
        });
      }
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Trigger native download
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${reportTitle}.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Excel export error:", error);
  }
};

export default DownloadTableToExcel;
