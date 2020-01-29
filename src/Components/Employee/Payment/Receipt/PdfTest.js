import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer
} from "@react-pdf/renderer";
import ReactDOM from "react-dom";

const PdfTest = props => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row"
    },
    section: {
      flexGrow: 1
    }
  });

  const MyDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Hello World!</Text>
        </View>
        <View style={styles.section}>
          <Text>We're inside a PDF!</Text>
        </View>
      </Page>
    </Document>
  );
//   ReactDOM.render(
//     <PDFViewer>{MyDocument}</PDFViewer>,
//     document.getElementById("root")
//   );
  return <div style={{marginTop: '50px'}}>
      hi
      <div ><PDFViewer style={{width: '100vw', height: '100vh'}}>{MyDocument}</PDFViewer></div>
      </div>;
};

export default PdfTest;
