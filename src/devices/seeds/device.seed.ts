import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { DeviceEntity } from '../../devices/entities/device.entity';

export default class DeviceSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(DeviceEntity);
    await repository.insert([
      {
        name: 'Lâmpada LED',
        type: 'Energia',
        madeBy: 'Intelbras',
        active: false,
        info: '10 wats',
        photoUrl:
          'https://intelbras.vteximg.com.br/arquivos/ids/160115-1000-1000/ews_407_front_cor.jpg?v=637564221001370000',
        ip_address: '127.0.0.1',
        mac_address: '127.0.0.1',
      },
      {
        name: 'Câmera de vídeo iM4 C',
        type: 'Segurança eletrônica',
        madeBy: 'Intelbras',
        active: false,
        info: 'Detecta Movimento',
        photoUrl:
          'https://intelbras.vteximg.com.br/arquivos/ids/163947-800-800/IM4-1---Frontal.png?v=637813074366430000',
        ip_address: '127.0.0.1',
        mac_address: '127.0.0.1',
      },
      {
        name: 'Smart controle universal infravermelho',
        type: 'Comunicação',
        madeBy: 'Intelbras',
        active: false,
        info: '100 metros',
        photoUrl:
          'https://intelbras.vteximg.com.br/arquivos/ids/158406-800-800/persp-esquerda.jpg?v=637309549919770000',
        ip_address: '127.0.0.1',
        mac_address: '127.0.0.1',
      },
    ]);
  }
}
