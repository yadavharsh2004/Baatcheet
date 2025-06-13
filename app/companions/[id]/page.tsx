import CompanionComponent from "@/components/CompanionComponent";
import { getCompanion } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

interface CompanionSessionPageProps {
  params : Promise<{id: string}>;
}

// params  /url/{id}
// searchParams  /url/?key=value&key1=value1 

const CompanionSession = async ({params} : CompanionSessionPageProps) => {
  const {id} = await params;
  const companion = await getCompanion(id);
  const user = await currentUser();

  
  if (!companion || !companion.name) {
    console.error("No companion found for id:", id);
    redirect('/companions'); // or return some fallback
  }

  const {name, title, subject, topic, duration } = companion;

  if(!user) redirect('/sign-in');
  if(!name) redirect('/companions');

  return (
    <main>
      {/* header */}
      <article className="flex rounded-border justify-between p-6 max-md:flex-col ">
        <div className="flex items-center gap-2 ">

          <div className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden "
            style={{backgroundColor: getSubjectColor(subject)}}
          >
            <Image src={`/icons/${subject}.svg`} alt="subject" height={35} width={35} />
          </div>

          <div className="flex flex-col gap-2  ">
            <div className="flex items-center gap-2">

              <p className="font-bold text-2xl">
                {name}
              </p>

              <div className="subject-badge max-sm:hidden">
                {subject}
              </div>

            </div>
            <p className="text-lg">{topic}</p>
          </div>

        </div>

        <div className="items-start text-2xl max-md:hidden">
          {duration} minutes
        </div>
      </article>

      <CompanionComponent 
        {...companion}
        companionId = {id}
        userName = {user.firstName!}
        userImage = {user.imageUrl!}
      />

    </main>
  )
}

export default CompanionSession