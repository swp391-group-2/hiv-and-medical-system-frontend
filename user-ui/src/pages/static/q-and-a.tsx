import PostContent from "@/components/qAndA/post-content";
import QAndAHero from "@/components/qAndA/qanda-hero";

function QAndA() {
  return (
    <div className="min-h-screen bg-background">
      <QAndAHero />
      <div className="mt-8">
        <PostContent />
      </div>
    </div>
  );
}

export default QAndA;
