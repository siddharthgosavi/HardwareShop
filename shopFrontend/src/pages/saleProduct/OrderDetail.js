import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { getProduct } from "../../redux/features/product/productSlice";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./OrderDetail.scss";
import InvoiceComponent from "../../pages/invoice/InvoiceComponent";
import moment from "moment-timezone";

import { useReactToPrint } from "react-to-print";

const OrderDetail = ({ order, closeDetail }) => {
  const { customerInfo, orderDate, products, total, paymentMode } = order;
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const contentRef = useRef();

  useEffect(() => {
    const fetchProductDetails = async () => {
      const details = await Promise.all(
        products.map(async product => {
          const response = await dispatch(getProduct(product.product));
          return { ...product, product: response.payload };
        })
      );
      setProductDetails(details);
      setLoading(false);
    };

    fetchProductDetails();
  }, [products, dispatch]);

  const generatePDF = async () => {
    var sizer = 150;
    var count = productDetails.length;
    count < 5 && count > 15 && count <= 20 ? (sizer = 200) : count > 20 && count <= 30 ? (sizer = 100) : count > 31 && (sizer = 35);
    console.log(sizer);

    const input = contentRef.current;
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/jpeg", 0.75);
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth + sizer; // Use full width
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const xOffset = (pdfWidth - imgWidth) / 2; // Center the image horizontally
    const yOffset = (pdfHeight - imgHeight) / 2; // Center the image vertically
    pdf.addImage(imgData, "JPEG", xOffset, yOffset, imgWidth, imgHeight);
    const filename = `${customerInfo.name}_${moment.utc(orderDate).tz("Asia/Kolkata").format("YYYY-MM-DD_hh-mm-ss_A")}_Invoice.pdf`;
    const pdfBlob = pdf.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, filename);
    pdf.save(filename);
  };

  return (
    <div className="order-detail">
      <div className="order-detail-content">
        <span className="close" onClick={closeDetail}>
          &times;
        </span>
        <span className="print">
          <button onClick={generatePDF}>Print Bill</button>
        </span>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div ref={contentRef}>
            <InvoiceComponent order={order} productDetails={productDetails} />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
