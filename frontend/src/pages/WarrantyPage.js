import React, { useState } from "react";
import Layout from "../components/Layout";
import styles from "../styles/WarrantyPage.module.scss";
import FormContainer from "../components/WarrantyPage/FormContainer/FormContainer";

export default function WarrantyPage() {
  const [loading, setLoading] = useState(true);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <h2>Warranty / Product Registration Form</h2>
          <p>
            Please take a moment to register your product with us and sign up to
            receive infromation about updates and new products releases. Send
            registration form by mail or electronically
          </p>
        </div>
        <FormContainer loading={loading} setLoading={setLoading} />
        <div className={styles.top__container}>
          <h2>Warranty / Product Registration Form</h2>
          <span>
            Please take a moment to register your product with us and sign up to
            receive infromation about updates and new products releases. Send
            registration form by mail or electronically
          </span>
        </div>
        <div className={styles.form__container}></div>
        <div className={styles.warrantyDetails__container}>
          <h2>Warranty Details</h2>
          <p>
            We offer a generous 12-month Limited Warranty that covers the
            original purchaser from any defects under normal use from the date
            of purchase. We also offer free technical support for 12 months,
            including the help of getting repair service and spare parts. We
            offer a 6 months warranty for our used certified items.
            Unfortunately, our warranty does not cover water damage or any kind
            of physical damage including road accidents. Items modified by the
            customer are not covered.
          </p>
          <h4>Warranty Limitations:</h4>
          <p>
            This Limited Warranty covers the original purchaser from any defects
            in material or workmanship under normal use for one year from the
            date of the invoice. This warranty is only offered to the original
            purchaser of the product and is not transferable to a subsequent
            purchaser. Freemotion will either repair or replace the product at
            no charge, using new or refurbished replacement parts at our
            discretion. Replacements may be different but functionally
            equivalent models. This Limited Warranty does not cover any problem
            that is caused by conditions, malfunctions, or damage not resulting
            from defects in material or workmanship. These conditions may
            include but are not limited to, road hazards, accidents, and
            improper operation or maintenance. Items returned for refund must be
            returned within 14 days from delivery. Under no circumstances will
            we issue refunds after 14 days of delivery.
          </p>
          <h4>Replacement Extended Warranty</h4>
          <p>
            All replacement products are covered by the standard warranty
            starting at the date of the original delivery. If for various
            reasons the replacement procedure extends beyond the warranty
            period, we at our discretion will extend the warranty coverage on
            such replacement up to an additional 30 days. Please be advised that
            this extended warranty is final and any additional extensions are
            non-negotiable.
          </p>
          <h4>Limits And Exclusions</h4>
          <p>
            There are no express warranties except as listed above. FreeMotion
            shall not be liable for special, incidental, consequential or
            punitive damages, including, without limitation, direct or indirect
            damages for personal injury, loss of goodwill, profits or revenue,
            loss of use this product or any associated equipment, cost of
            substitute equipment, downtime cost, or any other losses, or claims
            of any party dealing with buyers from such damages, resulting from
            the use of or inability to use this product or arising from breach
            of warranty or contract, negligence, or any other legal theory. In
            no event shall FreeMotion be liable for any incidental, indirect,
            special or consequential damages or liabilities (including but not
            limited to incidental or consequential damages for loss of time,
            inconvenience, loss of use of product, or any other consequential or
            incidental loss) in connection with the purchase, use, or operation
            of the product. FreeMotion is not liable for property damage,
            personal injury, or death. All express and implied warranties,
            including the warranties of merchantability and fitness for a
            particular purpose, are limited to the applicable warranty period
            set forth above.
          </p>
        </div>
        <div className={styles.repairRequests__container}>
          <h2></h2>
          <h4>Cancellations</h4>
          <p>
            If you have placed an order, it has not yet shipped, and you wish to
            cancel, please forward your order confirmation to
            cancellation@freemotion.com to request cancel. Since the
            cancellation process may take up to 24 hours, please note that any
            orders that do ship in the meantime will have to be rejected and/or
            returned to us. Any shipping charges incurred when returning a
            product to FreeMotion are the responsibility of the customer.
            Furthermore, if received, the box should remain unopened. Once we
            receive the returned order, the refund will be processed within 48
            hours. The shipping charge is not refundable. Thanks for your
            understanding and cooperation.
          </p>
          <h4>State Law Rights</h4>
          <p>
            Some states do not allow the exclusion or limitation of incidental
            or consequential damages or limitations on how long an implied
            warranty lasts, so the above limitations or exclusions may not apply
            to you. This warranty gives you specific legal rights, and you may
            also have other rights, which vary, from state to state. We are not
            responsible for typographical errors. Product photos are for
            illustration only: the actual product may have cosmetic differences.
          </p>
        </div>
      </div>
    </Layout>
  );
}
