import { Asset } from "expo-asset";

import * as Print from "expo-print";

import * as Sharing from "expo-sharing";

import * as FileSystem from "expo-file-system";

import { Alert } from "react-native";

export const generateAppointmentPdf = async () => {
  const asset = Asset.fromModule(require("../assets/images/logo.png"));

  await asset.downloadAsync();

  const logoBase64 = await FileSystem.readAsStringAsync(asset.localUri!, {
    encoding: FileSystem.EncodingType.Base64,
  });

  try {
    const htmlContent = `
      <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              padding: 30px;
              color: #000;
              font-size: 14px;
              line-height: 1.6;
            }
            .header {
              display: flex;
              align-items: center;
              margin-bottom: 100px;
            }
            .header img {
              width: 70px;
              height: auto;
              margin-right: 20px;
            }
            .header-text {
              display: flex;
              flex-direction: column;
              justify-content: center;
              margin-right : 80px;
            }
            .header-text .title {
              font-size: 22px;
              font-weight: bold;
              margin: 0;
              text-align: left;
            }
            .header-text .subtitle {
              font-size: 16px;
              color: #a77cd6;
              margin: 4px 0 0 0;
              text-align: left;
            }
            .dear {
              margin-bottom: 24px;
            }
            p {
              margin-bottom: 16px;
              text-align: justify;
            }
            .footer {
              margin-top: 40px;
            }
            .footer p {
              margin-bottom: 6px;
            }
            .signature {
              font-style: italic;
              margin-top: 80px;
              font-size: 13px;
              color: #555;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <img src="data:image/png;base64,${logoBase64}" />
            <div class="header-text">
              <div class="title">GROWTH ASSURED</div>
              <div class="subtitle">YOURS WEALTH PARTNER</div>
            </div>
          </div>

          <p class="dear">Dear Mr. <b>EUSUF ALI SHEIKH</b>,</p>

          <p><strong>Welcome to Growth Assured,</strong><br/>
          A total financial distribution organization who offers financial solutions to meet the unique needs of clients.</p>

          <p>Established in 2024 with the vision of creating a consumer financial distribution business. The organization is founded by executives with deep experience in the financial services industry.</p>

          <p>Growth Assured offers a comprehensive approach to financial planning that is designed to help clients achieve their financial goals. Whether our clients are looking for assistance with investments, insurance, savings, or borrowing, Growth Assured has the expertise and resources to provide tailored solutions that meet their specific needs.</p>

          <p>With great enthusiasm, we extend a warm welcome, and engage you as a champion of our Initiative. Your application has been processed, and you have been appointed as a <strong>“FINANCIAL PLANNER”</strong> with the assigned sourcing code number: <strong>GAFP0000527</strong>. Kindly use this code for all future correspondence related to our Distribution Products.</p>

          <p>As you initiate the submission of applications on behalf of your customers, let us collaborate to build a more welcoming and ethical world, guided by a strong code of conduct.</p>

          <p>For any further information, please contact us via email at: <strong>service@growthassured.co.in</strong></p>

          <p>We look forward to building a long-lasting and successful relationship.</p>

          <div class="footer">
            <p>Thanks & Regards,</p>
            <p>Team Growth Assured</p>
          </div>

          <div class="signature">
            “This is an electronically generated Letter, hence does not require a signature.”
          </div>
        </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({ html: htmlContent });

    await Sharing.shareAsync(uri);

    return uri;
  } catch (error) {
    console.error("Error generating PDF:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";
    Alert.alert("Error", errorMessage);
  }
};
