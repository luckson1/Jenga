
import {SlOptionsVertical} from "react-icons/sl"
import { useRouter } from "next/router";
import { api } from "../../utils/api";
import GetThumbNail from "../../components/images/GetThumbNail";
import { MdDeleteForever, MdEdit, MdOutlineRemoveRedEye } from "react-icons/md";
import Link from "next/link";
import {  useState } from "react";
import Loading from "../../components/display/LoadingComponent";
import {  useSession } from "next-auth/react";

import { LoginCard } from "../../components/forms/LoginPage";
import Onboarding from "../../components/forms/Onboarding";


  

const Index =  () => {
  
  const router = useRouter();
let isAllowed=false
const {data, status}=useSession()
      // tslint:disable-next-line (for vercel build)
  //@ts-ignore
const userRole=data?.user?.role
isAllowed=userRole==="ADMIN" || userRole==="SELLER" || userRole==="EDITOR"
const isLoadingStatus=status==="loading"
const isUnAthorised=status==="unauthenticated"
const isAuthorised=status==="authenticated"




  //fetch user products
  const { data: userProducts, isError, error , isLoading} = api.product.getUserProducts.useQuery();

  const ctx=api.useContext()
  
  const {mutate:del}=api.product.delete.useMutation({
    onSuccess:()=>{ ctx.product.getUserProducts.invalidate(); setIsShowModal(false)}
  })

  const handleDelete= (selectedId: string)=> {del({id:selectedId})}
const [selectedId, setSelectedId]=useState("")
const [isShowModal, setIsShowModal]=useState(false)

if (isUnAthorised) return <LoginCard />
if (isLoadingStatus) return <div className="w-[300px] h-[300px]"><Loading /></div>
if(isAuthorised && !isAllowed) return <Onboarding />
  return (
    <div className="mt-0 mb-2  md:mt-16 w-full rounded-md bg-white p-8">
      <div className=" flex items-center justify-between pb-6">
        <div>
          <h2 className="font-semibold text-gray-600">Products</h2>
          <span className="text-xs">All products item</span>
        </div>
        <div className="flex w-[70%] items-center justify-between">
          <div className="flex w-[50%] items-center rounded-md bg-gray-50 p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="ml-1 block bg-gray-50 outline-none "
              type="text"
              name=""
              id=""
              placeholder="search..."
            />
          </div>
          <div className="ml-1 flex flex-col justify-start gap-2 space-x-4 md:flex-row  lg:ml-40">
            <button className="max-h-8 cursor-pointer rounded-md bg-violet-600 px-4 py-2 text-xs font-semibold text-white md:text-sm"
			onClick={()=> router.push("/dashboard/productform")}>
              Create
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="-mx-4 overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
            {!isLoading && !isError && !userProducts?.length? <p className="text-lg text-center">
                  You have Not Listed Any Product. Please Create One
                </p>:isError? <p className="text-lg text-center">{error.message}</p>: isLoading? <div className="w-[200px] h-[200px] flex justify-center "><Loading /> </div>:<table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Name
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Price
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Department
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Category
                  </th>

                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Status
                  </th>

                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                { userProducts?.map((p) => (
                  <tr key={p.id}>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <GetThumbNail id={p.Image?.at(0)?.id} />
                        </div>
                        <div className="ml-3">
                          <p className="whitespace-no-wrap text-gray-900">
                            {p.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap text-gray-900">
                        {p.price}
                      </p>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap text-gray-900">
                        {p.department.name}
                      </p>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap text-gray-900">
                        {p.subDepartment.name}
                      </p>
                    </td>

                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                        <span
                          aria-hidden
                          className="absolute inset-0 rounded-full bg-green-200 opacity-50"
                        ></span>
                        <span className="relative">
                          {p.Published ? "Published" : "Unpublished"}
                        </span>
                      </span>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <div className="dropdown dropdown-left z-10">
  <label tabIndex={0} className="btn m-1 btn-ghost">   <SlOptionsVertical className="whitespace-no-wrap text-gray-900 cursor-pointer" /></label>
  <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32">
  <li> < Link href={{pathname: `/departments/category/product/${p.id}`}}> <MdOutlineRemoveRedEye className="text-xl"/> View</Link></li>
    <li><Link href={{pathname: `dashboard/editproduct/${p.id}`}}> <MdEdit className="text-xl"/>  Edit</Link></li>
    <li><button  onClick={()=>{setSelectedId(p.id); setIsShowModal(true)}}><MdDeleteForever className="text-xl"/> Delete</button></li>
  </ul>
</div>
                   
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>}
            <div className="xs:flex-row xs:justify-between flex flex-col items-center border-t bg-white px-5 py-5          ">
              <span className="xs:text-sm text-xs text-gray-900">
                Showing 1 to 4 of 50 Entries
              </span>
              <div className="xs:mt-0 mt-2 inline-flex">
                <button className="rounded-l bg-indigo-600 py-2 px-4 text-sm font-semibold text-indigo-50 transition duration-150 hover:bg-indigo-500"
                onClick={()=>router.push("dashboard/SellerOnboarding")}>
                  Prev
                </button>
                &nbsp; &nbsp;
                <button className="rounded-r bg-indigo-600 py-2 px-4 text-sm font-semibold text-indigo-50 transition duration-150 hover:bg-indigo-500">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
   {  isShowModal && <div className="fixed bg-transparent w-screen h-screen top-0 z-100 flex justify-center items-center">
      <div className="card w-96 h-60 bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">Are You Sure?</h2>
    <p>This will permanently delete the product?</p>
    <div className="card-actions justify-between">
    <button className="btn btn-primary" onClick={()=> setIsShowModal(false)}>Cancel</button>
      <button className="btn btn-error" onClick={()=>handleDelete(selectedId)}>Delete</button>
      
    </div>
  </div>
</div>
       

</div>}
    </div>
  );
};

export default Index;
