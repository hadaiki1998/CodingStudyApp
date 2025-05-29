import { Dialog, DialogContent } from "@/components/ui/dialog";
import Spinner from "../spinner/spinner";

export default function LoadingDialog({ open }: { open: boolean }) {
  return (
    <Dialog open={open}>
      <DialogContent className="flex flex-col items-center justify-center gap-4 py-8">
        <Spinner />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </DialogContent>
    </Dialog>
  );
}
