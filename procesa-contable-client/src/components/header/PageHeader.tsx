import { PageTitleType } from "@/types/children-type";

const PageHeader = ({ pageTitle, className, children }: PageTitleType) => {
  return (
    <article className={className}>
      <h2 className="text-xl font-bold">{pageTitle}</h2>
      <div>{children}</div>
    </article>
  );
};

export default PageHeader;
