import { PageTitleType } from "@/types/children-type";

const PageHeader = ({ pageTitle, className }: PageTitleType) => {
  return (
    <article className={className}>
      <h2 className="text-xl font-bold">{pageTitle}</h2>
    </article>
  );
};

export default PageHeader;
