import { CrossIcon, XmlIcon } from "@/components/icons";
import { bytesToSize } from "@/lib/utils";
import { FileItemProps } from "@/types/componets-types";

const FileItem = ({ fileName, fileSize, index, deleteFile }: FileItemProps) => {
  const handleClick = () => {
    deleteFile(index);
  };
  return (
    <article className="w-full flex flex-col -space-y-1 items-center bg-accent border rounded p-2 relative">
      <div className="w-full flex space-x-2 items-center">
        <div className="p-1 bg-background border rounded">
          <XmlIcon className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{fileName}</span>
          <small className="text-[0.70rem] text-muted-foreground">{bytesToSize(fileSize)}</small>
        </div>
      </div>
      <CrossIcon onClick={handleClick} className="absolute top-3 right-2 w-4 h-4 text-muted-foreground cursor-pointer" />
    </article>
  );
};

export default FileItem;
