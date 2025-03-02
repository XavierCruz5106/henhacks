import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

const UploadNotes = () => {
  return (
    <div className="space-y-4 pt-4">
      <div className="border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center">
        <Upload className="h-10 w-10 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">Upload Your Notes</h3>
        <p className="text-sm text-muted-foreground text-center mb-4">
          Drag and drop your notes or click to browse. Supports PDF, images, and text files.
        </p>
        <Button>Upload Files</Button>
      </div>
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Options</h3>
        <div className="grid grid-cols-2 gap-4">
          {/* Add checkbox options here */}
        </div>
      </div>
    </div>
  );
};

export default UploadNotes;