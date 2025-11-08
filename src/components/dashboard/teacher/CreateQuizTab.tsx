import { TopicUploadForm } from "./TopicUploadForm";
import { GeneratedQuizzesList } from "./GeneratedQuizzesList";

export const CreateQuizTab = () => {
  return (
    <div className="space-y-6">
      <TopicUploadForm />
      <GeneratedQuizzesList />
    </div>
  );
};
