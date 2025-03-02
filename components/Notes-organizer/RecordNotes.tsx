import { FileText, Mic, Download, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"

const RecordNotes = () => {
  return (
    <div className="space-y-4 pt-4">
      <div className="border rounded-lg p-6 flex flex-col items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Mic className="h-10 w-10 text-primary" />
        </div>
        <h3 className="text-lg font-medium mb-2">Record Lecture</h3>
        <p className="text-sm text-muted-foreground text-center mb-4">
          Record your lectures and let AI transcribe and organize the content.
        </p>
        <div className="flex space-x-4">
          <Button variant="outline">Cancel</Button>
          <Button>Start Recording</Button>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Recent Recordings</h3>
        {/* Map through recent recordings */}
        <div className="space-y-2">
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Physics Lecture - Electromagnetism</p>
                <p className="text-xs text-muted-foreground">Feb 25, 2025 • 45:12</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon">
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordNotes;
