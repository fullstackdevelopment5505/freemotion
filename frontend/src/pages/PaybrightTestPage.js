import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PaybrightTestPage() {
  const [htmlData, setHtmlData] = useState(``);

  useEffect(() => {
    const fetchPB_data = async (req, res) => {
      const result = await axios({
        url: "https://sandbox.paybright.com/CheckOut/ApplicationForm.aspx",
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          x_account_id: "KRqG5PrFIbwEYKzNwrbVJqHqz1Cyx7GpmDAdyv4OLXI8SvnWDU",
        },
      });

      console.log(result.data);

      setHtmlData(result.data);
    };

    fetchPB_data();
  }, []);

  return (
    <div>
      <p>Hello!</p>
      <div dangerouslySetInnerHTML={{ __html: htmlData }} />
    </div>
  );
}
