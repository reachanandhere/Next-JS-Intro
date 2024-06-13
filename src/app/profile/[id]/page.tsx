export default function userProfile({params}:any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile Page</h1>
            <hr />
            <p className="text-4xl">{params.id}</p>
        </div>
    )
}