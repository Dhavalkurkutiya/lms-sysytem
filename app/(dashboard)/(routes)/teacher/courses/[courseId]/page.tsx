const CoureseIdPage = ({
    params
}: {
    params: { courseId: string };
}) => {
    return ( 
        <div>
            Course Id Page: {params.courseId}
        </div>
     );
}
 
export default CoureseIdPage;