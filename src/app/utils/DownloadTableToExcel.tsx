import ExcelJS from "exceljs";

const DownloadTableToExcel = async (
  data: any[],
  reportTitle: string,
  columns: { header: string; key: string; width?: number }[]
) => {
  try {
    if (!reportTitle || !data || data.length === 0 || !columns?.length) return;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(reportTitle);

    worksheet.columns = columns;

    // Add rows
    data.forEach((row) => {
      const newRow: any = {};
      columns.forEach((col) => {
        newRow[col.key] = row[col.key];
      });
      worksheet.addRow(newRow);
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
        fgColor: { argb: "FF4B5563" }, // Dark gray
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

    // Generate and download
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${reportTitle}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error("Excel export error:", error);
  }
};

export default DownloadTableToExcel;
