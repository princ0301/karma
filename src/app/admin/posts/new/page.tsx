import PostForm from "@/components/PostForm";
import { createPostAction } from "@/app/admin/actions";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="font-display text-2xl text-paper">New post</h1>
      <div className="mt-8">
        <PostForm action={createPostAction} submitLabel="Publish" />
      </div>
    </div>
  );
}
