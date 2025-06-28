function extractFirstJsonArray(text: string): string {
  const match = text.match(/\[\s*{[\s\S]*?}\s*\]/);
  return match ? match[0] : '[]';
}

export function parseGeminiResult(rawJson: any): {
  medicine: string;
  dosage: string;
  timing: string[];
}[] {
  let arr: any[] = [];
  if (typeof rawJson === 'string') {
    try {
      const jsonStr = extractFirstJsonArray(rawJson);
      arr = JSON.parse(jsonStr);
    } catch {
      return [];
    }
  } else if (Array.isArray(rawJson)) {
    arr = rawJson;
  } else {
    return [];
  }
  return arr.map((item: any) => ({
    medicine: item.medicine?.trim() || "Unknown",
    dosage: item.dosage?.trim() || "N/A",
    timing: Array.isArray(item.timing) ? item.timing : [item.timing || "N/A"]
  }));
}

export function generateReadableSummary(
  prescriptionData: {
    medicine: string;
    dosage: string;
    timing: string[];
  }[]
): string {
  console.log("Prescription Data:", prescriptionData);
  let summary = "📄 Your Prescription Summary:\n\n";

  prescriptionData.forEach((item, index) => {
    summary += `${index + 1}️⃣ ${item.medicine}\n`;
    summary += `   • Dosage: ${item.dosage}\n`;
    summary += `   • Timing: ${item.timing.join(", ")}\n\n`;
  });

  summary += `⏳ Duration: 5 Days\n Please take medicines as per timing. Get well soon!`;

  return summary;
}
