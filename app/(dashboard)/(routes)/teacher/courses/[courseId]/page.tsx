import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
const CoureseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!course) {
    return redirect("/");
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categaryId,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  return(
    <div className="p-6">
      <div className="flext items-center justify-center">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">
            Course Setup
          </h1>
          <span className="text-sm text-slate-700">
            Complate all fields {completionText}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flext items-center gap-x-2">
            <IconBadge size="sm" variant="success" icon={LayoutDashboard}/>
            <h2 className="text-xl">
              Custemize your course course
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
};

export default CoureseIdPage;
