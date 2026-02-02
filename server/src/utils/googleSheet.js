import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export const appendOrderToSheet = async (order) => {
  console.log(`appendOrderToSheet called for order ${order?._id} with ${order?.orderItems?.length || 0} items`);
  try {
    // const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    let privateKey = process.env.GOOGLE_PRIVATE_KEY;

    if (!clientEmail || !privateKey) {
      console.warn('Google Sheets credentials missing. Skipping sheet append.');
      return;
    }

    // Log email (don't log full private key)
    console.log('Google Sheets client email:', clientEmail);

    // Remove surrounding quotes if present and replace escaped newlines with actual newlines
    privateKey = privateKey.replace(/\\n/g, '\n').replace(/^"(.*)"$/s, '$1');

    const auth = new JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, auth);

    console.log('Authenticated with Google Sheets service account');

    await doc.loadInfo();

    console.log('Loaded spreadsheet:', doc.title, 'sheets:', doc.sheetsByIndex.length);

    const sheet = doc.sheetsByIndex[0];

    let rowsAdded = 0;

    const productsText = order.orderItems
      .map(
        (item, index) =>
          `${index + 1}. ${item.name} x${item.qty}`
      )
      .join('\n');

    await sheet.addRow({
      orderID: order._id.toString(), // nhớ trùng header
      customer: order.shippingAddress.fullName,
      productName: productsText,     // ✅ nhiều dòng trong 1 ô
      totalPrice: order.totalPrice,
      phone: order.shippingAddress.phone,
      address: `${order.shippingAddress.address}, ${order.shippingAddress.city}`,
      email: order.shippingAddress.email,
      createdAt: order.createdAt.toISOString(),
    });


    console.log(`Appended ${rowsAdded} rows to sheet "${sheet.title || 'Sheet1'}"`);
  } catch (error) {
    console.error('Error appending order to Google Sheet:', error);
    // Don't throw — we don't want sheet failures to break order creation
  }
};
