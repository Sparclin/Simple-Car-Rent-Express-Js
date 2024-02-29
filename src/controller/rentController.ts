import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// export const createRent = async (req: Request, res: Response) => {
//   try {
//     const carID = Number(req.body.carID);
//     const { namaPenyewa, lamaSewa} = req.body;

//     const car = await prisma.rent.findFirst({
//       where: {
//         carID : carID,
//       },
//       include: {
//         car_details: true,
//       },
//     });

//     const totalbayar = lamaSewa * car.car_details.hargaperhari;

//     if (!car || !car.car_details) {
//       return res.status(400).json({
//         status: false,
//         error: "Data mobil tidak ditemukan.",
//       });
//     }

//     const rent = await prisma.rent.create({
//       data: {
//         carID,
//         namaPenyewa,
//         lamaSewa,
//         totalbayar
//       },
//     });

//     return res.status(200).json({
//       status: true,
//       message: "Berhasil",
//       rent
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       status: false,
//       error
//     });
//   }
// };

export const createRent = async (req: Request, res: Response) => {
  try {
    const carID = Number(req.body.carID);
    const { namaPenyewa, lamaSewa } = req.body;

    const car = await prisma.car.findFirst({
      where: {
        carID: carID,
      },
    });

    if (!car) {
      return res.status(400).json({
        status: false,
        error: "Data mobil tidak ditemukan.",
      });
    }

    const totalbayar = lamaSewa * car.hargaperhari;

    const rent = await prisma.rent.create({
      data: {
        carID,
        namaPenyewa,
        lamaSewa,
        totalbayar,
      },
    });

    return res.status(200).json({
      status: true,
      message: "Berhasil",
      rent,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      error,
    });
  }
};


export const showRent = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const qty = Number(req.query.qty) || 5;
    const keyword = req.query.keyword?.toString() || "";

    const rent = await prisma.rent.findMany({
      take: qty,
      skip: (page - 1) * qty,
      where: {
        OR: [{ namaPenyewa: { contains: keyword } }],
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return res.status(200).json({
      status: true,
      message: `Berhasil`,
      rent,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error,
    });
  }
};

export const deleteRent = async (req : Request, res : Response) => {
  try {

      const rentID = req.params.rentID

      const findrent = await prisma.rent.findFirst({
          where : {
              rentID : Number(rentID)
          },
      });

      if(!findrent){
          return res.status(400)
          .json({
              status : false,
              message : `Data ID not found`
          })
      }

      const rentDelete = await prisma.rent.delete({
          where : {
              rentID : Number(rentID)
          }
      })

      return res.status(200).json({
          status : false,
          message : `event with ID ${rentDelete} has been deleted`,
          rentDelete
      })

  } catch (error){
      res.status(500).json({
          status : false,
          error
      })
  }
}

export const updateRent = async (req: Request, res: Response) => {
  try {
    const carID = Number(req.body.carID);
    const { namaPenyewa, lamaSewa} = req.body;
    const rentID =  Number(req.params.rentID)

    const car = await prisma.rent.findFirst({
      where: {
        carID,
      },
      include: {
        car_details: true,
      },
    });

    if (!car || !car.car_details) {
      return res.status(400).json({
        status: false,
        error: "Data mobil tidak ditemukan.",
      });
    }

    const totalbayar = lamaSewa * car.car_details.hargaperhari;

    const update = await prisma.rent.update({
      where : {
        rentID : rentID
      },
      data : {
        namaPenyewa,
        lamaSewa,
        totalbayar
      }
    })

    return res.status(201).json({
      status: true,
      message: "Berhasil",
      
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      error: "Terjadi kesalahan saat menyimpan data sewa.",
    });
  }
};