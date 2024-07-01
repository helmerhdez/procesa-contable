import PageTitle from "@/components/header/PageTitle";
import { UploadIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

const InvoiceAllPage = () => {
  return (
    <div className="px-4">
      <PageTitle className="pt-6 mb-3 flex justify-between" pageTitle="Invoices - All">
        <Button>
          <UploadIcon className="mr-2" />
          Upload
        </Button>
      </PageTitle>
    </div>
  );
};

export default InvoiceAllPage;
